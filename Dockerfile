# Stage 1: Building the code
FROM node:alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Run the app
FROM node:alpine

WORKDIR /app/

# Copy from builder stage
COPY --from=builder /app/ ./

# Set the environment to production
ENV NODE_ENV production

EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]
