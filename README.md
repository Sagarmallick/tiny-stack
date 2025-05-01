npm init -y

<!-- Install Needed Packages  -->

npm install express mongoose dotenv bcryptjs jsonwebtoken multer stripe cors
npm install nodemon --save-dev

<!-- What each one does: -->

express ➔ Web framework
mongoose ➔ Connect to MongoDB
dotenv ➔ Load environment variables
bcryptjs ➔ Password hashing
jsonwebtoken ➔ Auth with JWT
multer ➔ File upload handling
stripe ➔ Payment processing
cors ➔ Allow cross-origin frontend requests
nodemon ➔ Auto-restart server during development

stripe listen --forward-to localhost:5001/api/webhook/stripe
