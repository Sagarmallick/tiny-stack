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

tiny-stack/
│
├── config/
│ └── db.js # MongoDB connection
├── controllers/
│ └── authController.js
│ └── templateController.js
│ └── paymentController.js
├── middleware/
│ └── authMiddleware.js
│ └── errorMiddleware.js
├── models/
│ └── User.js
│ └── Template.js
│ └── Order.js
├── routes/
│ └── authRoutes.js
│ └── templateRoutes.js
│ └── paymentRoutes.js
├── uploads/
│ └── (uploaded template files here)
├── .env
├── server.js
└── package.json
