
import React from 'react';
import { Card } from '@/components/ui/card';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  stars: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Medical Student',
    avatar: '👩‍⚕️',
    quote: 'This adaptive quiz platform helped me pass my medical exams with flying colors. The way it adjusts to my knowledge gaps is incredible.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    avatar: '👨‍💻',
    quote: 'I use this to stay current with tech knowledge. The brainwave simulation feature feels like it knows when I\'m losing focus!',
    stars: 5,
  },
  {
    id: 3,
    name: 'Aisha Patel',
    role: 'High School Teacher',
    avatar: '👩‍🏫',
    quote: 'I recommend this platform to all my students. The analytics help me understand their learning patterns and improve my teaching.',
    stars: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="text-muted-foreground mt-2">Trusted by students and professionals worldwide</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="p-6 bg-white dark:bg-card shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="text-4xl mr-4">{testimonial.avatar}</div>
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
      
      <p className="mb-4 italic text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
      
      <div className="flex text-quiz-accent">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="text-xl">
            {i < testimonial.stars ? '★' : '☆'}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default Testimonials;
