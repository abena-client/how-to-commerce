import { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AIChatBot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your HowTo AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Simple AI responses based on keywords
    if (lowerMessage.includes('product') || lowerMessage.includes('buy')) {
      return "I can help you find products! Check out our Products page for cameras, TVs, headphones, gaming consoles, and smart watches. What are you looking for?";
    } else if (lowerMessage.includes('nft') || lowerMessage.includes('marketplace')) {
      return "Interested in NFTs? Visit our NFT Marketplace to see rankings, trading volumes, and analytics for top NFT collections!";
    } else if (lowerMessage.includes('wallet') || lowerMessage.includes('metamask')) {
      return "To connect your MetaMask wallet, click the 'Connect Wallet' button in the navigation bar. Make sure you have MetaMask installed!";
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our products range from affordable to premium. Browse our catalog to see detailed pricing and specifications.";
    } else if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days, and express shipping is available.";
    } else if (lowerMessage.includes('payment')) {
      return "We accept Visa, Mastercard, PayPal, Stripe, and cryptocurrency payments via MetaMask!";
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      return "I'm here to help! You can ask me about products, NFTs, payments, shipping, or anything else. Our support team is also available 24/7.";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! Great to chat with you. What would you like to know about HowTo?";
    } else if (lowerMessage.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    } else {
      return "That's an interesting question! I'm still learning. For specific inquiries, please contact our support team or browse our products and NFT marketplace.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) {
      toast.warning('Please enter a message');
      return;
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Chat cleared! How can I help you?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
    toast.info('Chat history cleared');
  };

  const quickQuestions = [
    "What products do you sell?",
    "How do I connect my wallet?",
    "Tell me about NFT marketplace",
    "What payment metho