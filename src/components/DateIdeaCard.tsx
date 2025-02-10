import { Heart, Share2 } from 'lucide-react';
import { DateIdeaCardProps } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DateIdeaCard({ idea, onLove, onShare }: DateIdeaCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-primary font-pompiere tracking-wide">
          {idea.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-center">
        <span className="block text-7xl" aria-hidden="true">
          {idea.icon}
        </span>
        <CardDescription className="text-lg text-foreground font-pompiere">
          {idea.description}
        </CardDescription>
        <p className="text-lg font-pompiere text-primary tracking-wide">
          Estimated Cost: {idea.estimatedCost}
        </p>
      </CardContent>
      <CardFooter className="justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onLove}
          className="hover:text-primary hover:border-primary"
        >
          <Heart className="h-4 w-4" />
          <span className="sr-only">Love this idea</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onShare}
          className="hover:text-primary hover:border-primary"
        >
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share this idea</span>
        </Button>
      </CardFooter>
    </Card>
  );
}