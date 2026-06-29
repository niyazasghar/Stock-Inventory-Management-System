"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";

interface ActionToastButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  message?: string;
  description?: string;
}

export default function ActionToastButton({ 
  children, 
  message = "Feature Simulated", 
  description = "This action is simulated for the portfolio demonstration.",
  onClick,
  ...props 
}: ActionToastButtonProps) {
  const { toast } = useToast();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) onClick(e);
    
    toast({
      title: message,
      description: description,
    });
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
