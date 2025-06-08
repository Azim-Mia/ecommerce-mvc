import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ProfileModel from '../../models/userModel/schemas'; // Uncommented and corrected
import { refresh_key } from '/data/data/com.termux/files/home/ecommerce-mvc/secret';

const findProfile = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token missing. Please log in.',
      });
    }

    // Verify token
    const decoded = jwt.verify(refreshToken, refresh_key) as jwt.JwtPayload;

    if (!decoded || !decoded.email) {
      return res.status(403).json({
        success: false,
        message: 'Invalid token. Verification failed.',
      });
    }

    // Find profile by email
    const profile = await ProfileModel.findOne({ email: decoded.email });

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile fetched successfully.',
      data: profile,
    });
  } catch (error: any) {
    console.error('Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal server error: ' + error.message,
    });
  }
};

export default findProfile;
