import React, { useState } from 'react';
import { Check, Link, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DateIdea } from '@/types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  idea: DateIdea;
  city: string;
}

export default function ShareModal({ isOpen, onClose, idea, city }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  const generateShareableUrl = () => {
    const baseUrl = window.location.origin;
  
    const params = new URLSearchParams({
      city,
      title: idea.title,
      description: idea.description,
      cost: idea.estimatedCost,
      icon: idea.icon
    });
    return `${baseUrl}/shared?${params.toString()}`;
  };

  const handleCopyLink = async () => {
    const url = generateShareableUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Check out this date idea!',
      text: `${idea.title} - ${idea.description} (${idea.estimatedCost})`,
      url: generateShareableUrl()
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        handleCopyLink();
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-pompiere text-center text-primary">
            Share This Date Idea
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="text-center space-y-2">
            <div className="text-5xl mb-4">{idea.icon}</div>
            <h3 className="text-xl font-pompiere text-primary/90">{idea.title}</h3>
            <p className="text-lg font-pompiere text-primary/80">{idea.description}</p>
          </div>

          <div className="flex flex-col gap-3">
            <Button 
              className="w-full font-pompiere text-lg h-12"
              onClick={handleShare}
            >
              <Share2 className="mr-2 h-5 w-5" />
              Share with friends
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full font-pompiere text-lg h-12"
              onClick={handleCopyLink}
            >
              {copied ? (
                <Check className="mr-2 h-5 w-5" />
              ) : (
                <Link className="mr-2 h-5 w-5" />
              )}
              {copied ? 'Copied!' : 'Copy link'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}