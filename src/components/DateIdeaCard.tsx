import { Heart, Share2 } from 'lucide-react';
import { DateIdeaCardProps } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DateIdeaCard({ idea, onLove, onShare }: DateIdeaCardProps) {
  return (
    <Card className="w-full rounded-2xl border-secondary/20">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-primary font-pompiere tracking-wide">
          {idea.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center pb-4">
        <span className="block text-6xl" aria-hidden="true">
          {idea.icon}
        </span>
        <CardDescription className="text-lg text-primary/90 font-pompiere">
          {idea.description}
        </CardDescription>
        <p className="text-lg font-pompiere text-primary/80">
          Estimated Cost: {idea.estimatedCost}
        </p>
      </CardContent>
      <CardFooter className="justify-center gap-4 pb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={onLove}
          className="h-8 w-8 rounded-full border-secondary/30 hover:text-primary hover:border-primary"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Love this idea</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onShare}
          className="h-8 w-8 rounded-full border-secondary/30 hover:text-primary hover:border-primary"
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share this idea</span>
        </Button>
      </CardFooter>
    </Card>
  );
}