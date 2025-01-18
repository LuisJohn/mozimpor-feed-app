'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StarRating } from '@/components/StarRating'
import Link from 'next/link'

export default function ClientFeedback() {
    const [satisfaction, setSatisfaction] = useState<'happy' | 'sad' | null>(null)
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState(0)

    const handleSatisfaction = (level: 'happy' | 'sad') => {
      setSatisfaction(level)
      if (level === 'happy') {
        setName('')
        setContact('')
        setComment('')
      }
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      const feedbackData = { satisfaction, name, contact, comment, rating, timestamp: new Date().toISOString() }

      try {
        const response = await fetch('/api/feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackData),
        })

        if (response.ok) {
          toast.success('Feedback submitted successfully!')
          // Reset the form
          setSatisfaction(null)
          setName('')
          setContact('')
          setComment('')
          setRating(0)
        } else {
          toast.error('Error submitting feedback. Please try again.')
        }
      } catch (error) {
        console.error('Error submitting feedback:', error)
        toast.error('Error submitting feedback. Please try again.')
      }
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl flex justify-end mb-4">
          <Link href="/dashboard">
            <Button variant="outline" className="text-lg py-2 px-4">
              Dashboard
            </Button>
          </Link>
        </div>
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center">Client Feedback</CardTitle>
            <CardDescription className="text-xl text-center">We value your opinion!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center space-x-16 mb-8">
              <Button
                variant={satisfaction === 'happy' ? 'default' : 'outline'}
                size="lg"
                className="w-40 h-40 rounded-full text-6xl"
                onClick={() => handleSatisfaction('happy')}
              >
                😍
              </Button>
              <Button
                variant={satisfaction === 'sad' ? 'default' : 'outline'}
                size="lg"
                className="w-40 h-40 rounded-full text-6xl"
                onClick={() => handleSatisfaction('sad')}
              >
                😞
              </Button>
            </div>
            {satisfaction && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="rating" className="text-lg">Rating</Label>
                  <StarRating onChange={setRating} />
                </div>
                {satisfaction === 'sad' && (
                  <>
                    <div>
                      <Label htmlFor="name" className="text-lg">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your name"
                        required
                        className="text-lg p-6"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact" className="text-lg">Contact</Label>
                      <Input
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Email or phone number"
                        required
                        className="text-lg p-6"
                      />
                    </div>
                    <div>
                      <Label htmlFor="comment" className="text-lg">Comment</Label>
                      <Textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Your feedback"
                        rows={4}
                        required
                        className="text-lg p-6"
                      />
                    </div>
                  </>
                )}
              </form>
            )}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full text-xl py-6"
              onClick={handleSubmit}
              disabled={!satisfaction || !rating || (satisfaction === 'sad' && (!name || !contact || !comment))}
            >
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>
        <ToastContainer position="bottom-right" />
      </div>
    )
  }
