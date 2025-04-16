# Simbian Security Operations Comparison

This project showcases a visually engaging and interactive webpage that contrasts the "Without Simbian" vs "With Simbian" security operations experience. It demonstrates the dramatic difference in performance, outcomes, and visual storytelling through animations and responsive design.

## Thought Process

My approach was to create a seamless scrolling experience that tells a compelling story about the transformation that occurs when using Simbian for security operations. I focused on creating a clear visual distinction between the "Without Simbian" section (characterized by increasing problems and alerts) and the "With Simbian" section (showing decreasing metrics and a step-by-step solution flow).

The animations were designed to reinforce the narrative - with shaking, glowing alerts in the problem section and smooth, calming transitions in the solution section. I used a consistent color language (red/yellow for problems, green for solutions) to enhance the storytelling.

## Animation Library

I chose Framer Motion for this project because:

1. It provides a declarative API that makes complex animations easier to implement
2. It has excellent support for gesture animations and transitions
3. It includes useful features like AnimatePresence for handling elements entering/exiting the DOM
4. It integrates well with React's component model

## Known Issues & Future Improvements

With more time, I would:

1. Add more sophisticated particle effects for the alerts
2. Implement a more detailed timeline visualization in the "With Simbian" section
3. Create more interactive elements that respond to user clicks/hovers
4. Add unit and integration tests to ensure animation performance
5. Optimize further for mobile devices with more tailored animations
6. Add accessibility features like reduced motion options

## Technologies Used

- Next.js 14
- Tailwind CSS
- Framer Motion
- TypeScript
