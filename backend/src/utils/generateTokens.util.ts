import jwt from 'jsonwebtoken';
import config from '../config/config';
const { sign } = jwt;

export const createAccessToken = (userId: number, username: string, first_name: string,
   last_name: string, email_id: string, added_by: number, role: string, company_id: number): string => {
  return sign({ userId: userId, username, first_name, last_name, email_id, added_by,role, company_id }, config.jwt.access_token.secret, {
    expiresIn: config.jwt.access_token.expire
  });
};

/**
 * This functions generates a valid refresh token
 *
 * @param {number | string} userId - The user id of the user that owns this jwt
 * @returns Returns a valid refresh token
 */
export const createRefreshToken = (userId: number | string): string => {
  return sign({ userId }, config.jwt.refresh_token.secret, {
    expiresIn: config.jwt.refresh_token.expire
  });
};
