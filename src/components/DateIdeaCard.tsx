import { Heart, Share2 } from 'lucide-react';
import { DateIdeaCardProps } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DateIdeaCard({ idea, onLove, onShare }: DateIdeaCardProps) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">
            <span className="mr-2 text-2xl">{idea.icon}</span>
            {idea.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {idea.description}
        </CardDescription>
        <p className="mt-4 text-sm font-medium text-primary">
          Estimated Cost: {idea.estimatedCost}
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-2">
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