'use client';

import React from 'react';

export default function ShareButtons({ slug, title, author }: { slug: string; title: string; author: string }) {
  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/blog/${slug}` : `https://nienalabs.com/blog/${slug}`;
    const encodedUrl = encodeURIComponent(url);
    const shareText = `Check out "${title}" by ${author} on the NienaLabs Blog!`;
    const encodedText = encodeURIComponent(shareText);
    
    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`, '_blank');
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(`${shareText}\n\n${url}`).then(() => {
        alert('Link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy link: ', err);
      });
    }
  };

  return (
    <div className="blog-share">
      <span className="blog-share-label">Share this article</span>
      <button 
        className="blog-share-btn" 
        aria-label="Share on Twitter" 
        title="Share on Twitter"
        onClick={() => handleShare('twitter')}
      >
        𝕏
      </button>
      <button 
        className="blog-share-btn" 
        aria-label="Share on LinkedIn" 
        title="Share on LinkedIn"
        onClick={() => handleShare('linkedin')}
      >
        in
      </button>
      <button 
        className="blog-share-btn" 
        aria-label="Copy Link" 
        title="Copy Link"
        onClick={() => handleShare('copy')}
      >
        🔗
      </button>
    </div>
  );
}
