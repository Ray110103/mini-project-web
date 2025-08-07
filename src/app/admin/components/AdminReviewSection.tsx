"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, User } from 'lucide-react';
import { format } from 'date-fns';

interface Review {
  id: number;
  adminId: number;
  eventTitle: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  eventDate: string;
}

interface AdminReviewSectionProps {
  adminId: number;
}

// Mock reviews data - removed userAvatar field
const mockReviews: Review[] = [
  {
    id: 1,
    adminId: 1,
    eventTitle: "Traditional Dance Festival 2024",
    userName: "Sarah Chen",
    rating: 5,
    comment: "Ray organized an absolutely incredible cultural festival! The attention to detail was amazing and everything ran smoothly. The traditional dance performances were breathtaking and the venue was perfect. Highly recommend!",
    createdAt: "2024-03-20",
    eventDate: "2024-03-15"
  },
  {
    id: 2,
    adminId: 1,
    eventTitle: "Cultural Heritage Workshop",
    userName: "Michael Rodriguez",
    rating: 5,
    comment: "Outstanding workshop! Ray's expertise in cultural events really showed. The speakers were knowledgeable, the activities were engaging, and I learned so much about Indonesian heritage. Will definitely attend more events organized by Ray.",
    createdAt: "2024-02-25",
    eventDate: "2024-02-20"
  },
  {
    id: 3,
    adminId: 1,
    eventTitle: "Indonesian Art Exhibition",
    userName: "Lisa Wang",
    rating: 4,
    comment: "Beautiful art exhibition with a great variety of Indonesian artists. The organization was professional and the venue layout made it easy to navigate. Only minor issue was the parking situation, but overall a fantastic experience.",
    createdAt: "2024-01-18",
    eventDate: "2024-01-10"
  },
  {
    id: 4,
    adminId: 1,
    eventTitle: "Music & Dance Fusion Show",
    userName: "David Kim",
    rating: 5,
    comment: "What an amazing fusion of traditional and modern performances! Ray really knows how to curate an incredible lineup. The sound quality was perfect, the lighting was spectacular, and the whole event felt professionally managed.",
    createdAt: "2024-04-28",
    eventDate: "2024-04-25"
  },
  {
    id: 5,
    adminId: 1,
    eventTitle: "Traditional Dance Festival 2024",
    userName: "Amanda Foster",
    rating: 5,
    comment: "This was my first time attending a traditional Indonesian cultural event and Ray made it such a welcoming experience. The performances were educational and entertaining. Great job on the organization!",
    createdAt: "2024-03-18",
    eventDate: "2024-03-15"
  }
];

const AdminReviewSection: React.FC<AdminReviewSectionProps> = ({ adminId }) => {
  const [reviews, setReviews] = useState<Review[]>(mockReviews.filter(r => r.adminId === adminId));
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [eventTitle, setEventTitle] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleSubmitReview = async () => {
    if (rating === 0 || comment.trim() === '' || eventTitle.trim() === '') {
      alert('Please provide rating, event title, and comment');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview: Review = {
        id: Date.now(),
        adminId,
        eventTitle: eventTitle.trim(),
        userName: 'Current User', // In real app, get from auth context
        rating,
        comment: comment.trim(),
        createdAt: new Date().toISOString(),
        eventDate: new Date().toISOString()
      };

      setReviews(prev => [newReview, ...prev]);

      // Reset form
      setRating(0);
      setComment('');
      setEventTitle('');
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error creating review:', error);
      alert('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= (interactive ? (hoveredRating || rating) : rating)
                ? 'fill-orange-500 text-orange-500'
                : 'text-gray-400'
            } ${interactive ? 'cursor-pointer hover:text-orange-500' : ''}`}
            onClick={() => interactive && onStarClick?.(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  // Function to get user initials
  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('')
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header with Add Review Button */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Reviews</h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              {renderStars(Math.round(averageRating))}
              <span className="text-sm text-gray-400">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>
          )}
        </div>
        <Button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-orange-500 hover:bg-orange-600 text-white"
          size="sm"
        >
          Write Review
        </Button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="bg-zinc-800 border-zinc-700">
          <CardContent className="p-4 space-y-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Event Title
              </label>
              <input
                type="text"
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Which event are you reviewing?"
                className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer ${
                      star <= (hoveredRating || rating)
                        ? 'fill-orange-500 text-orange-500'
                        : 'text-gray-400 hover:text-orange-500'
                    }`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Comment
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this organizer..."
                className="bg-zinc-700 border-zinc-600 text-white placeholder-gray-400"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600 text-white"
                size="sm"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </Button>
              <Button
                onClick={() => setShowReviewForm(false)}
                variant="outline"
                className="bg-zinc-700 border-zinc-600 text-white hover:bg-zinc-600"
                size="sm"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* User Avatar with Initials */}
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 flex-shrink-0">
                  <span className="text-sm font-bold text-white">
                    {getUserInitials(review.userName)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        {review.userName}
                      </h4>
                      <p className="text-xs text-gray-400 mb-1">
                        Event: {review.eventTitle}
                      </p>
                      <div className="flex items-center gap-2">
                        {renderStars(review.rating)}
                        <span className="text-xs text-gray-400">
                          {format(new Date(review.createdAt), 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{review.comment}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No reviews yet. Be the first to review this organizer!</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviewSection;
