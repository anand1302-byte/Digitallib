# DigitalLib - Modern Digital Library Web Application

A modern, responsive digital library web application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: JWT-based login/signup system
- **Book Management**: Browse, search, and filter books by category and type
- **User Account**: Profile management, borrowed books, wishlist, notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean interface with Framer Motion animations
- **Search & Filter**: Advanced search with category and type filters
- **Help & Support**: Comprehensive FAQ, tutorials, and support system

## Tech Stack

- **Frontend/Backend**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Database**: MongoDB (ready for integration)
- **Authentication**: JWT tokens

## Pages

1. **Home Page** - Hero section, popular books, categories, stats
2. **Login/Register** - Authentication forms with validation
3. **Books** - Browse all books with filtering and search
4. **My Account** - User profile, borrowed books, wishlist, settings
5. **About Us** - Vision, mission, contact info, feedback form
6. **Help** - FAQs, tutorials, technical support, news updates

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Open Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── books/             # Books listing page
│   ├── account/           # User account page
│   ├── about/             # About us page
│   ├── help/              # Help and support page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
├── lib/                   # Utility functions and data
├── types/                 # TypeScript type definitions
└── public/               # Static assets

```

## Key Components

- **Navbar**: Responsive navigation with search functionality
- **BookCard**: Reusable book display component with animations
- **Authentication Forms**: Login and registration with validation
- **Account Management**: Tabbed interface for user settings
- **Help System**: Searchable FAQs and support options

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Components**: Predefined button and card styles
- **Responsive Design**: Mobile-first approach
- **Color Scheme**: Primary blue and secondary purple palette
- **Typography**: Inter font family for modern look

## Future Enhancements

- MongoDB database integration
- Real authentication system
- Book borrowing functionality
- Payment processing
- Advanced search with Elasticsearch
- Real-time notifications
- Mobile app development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.