import mongoose  from 'mongoose';

const WelcomeScreenSchema = new mongoose.Schema({
  title: String,
  userName: String,
  greetingIcon: String,
  message: String,
  button: {
    text: String,
  }
}, { timestamps: true });
export default mongoose.model('WelcomeScreen', WelcomeScreenSchema);
