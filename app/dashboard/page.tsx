'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Feedback {
  satisfaction: 'happy' | 'sad'
  name: string
  contact: string
  comment: string
  rating: number
  timestamp: string
}

export default function Dashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch('/api/feedback')
      const data = await response.json()
      setFeedbacks(data.feedbacks)
    }
    fetchFeedbacks()
  }, [])

  const happyCount = feedbacks.filter(f => f.satisfaction === 'happy').length
  const sadCount = feedbacks.filter(f => f.satisfaction === 'sad').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Feedback Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="text-lg py-2 px-4">
              Back to Feedback Form
            </Button>
          </Link>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Feedback Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">Happy Clients</p>
                <p className="text-4xl text-green-600">{happyCount}</p>
              </div>
              <div>
                <p className="text-2xl font-bold">Sad Clients</p>
                <p className="text-4xl text-red-600">{sadCount}</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold">Total Feedbacks</p>
              <p className="text-4xl">{feedbacks.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedbacks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Satisfaction</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Comment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedbacks.slice().reverse().map((feedback, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(feedback.timestamp).toLocaleString()}</TableCell>
                    <TableCell>{feedback.satisfaction === 'happy' ? '😃' : '😞'}</TableCell>
                    <TableCell>{feedback.rating}</TableCell>
                    <TableCell>{feedback.name || '-'}</TableCell>
                    <TableCell>{feedback.contact || '-'}</TableCell>
                    <TableCell>{feedback.comment || '-'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
