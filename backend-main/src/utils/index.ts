import { NextFunction, Request, Response } from 'express';
import Admin from '../models/Admin';
import * as bcrypt from 'bcrypt';
import slugify from 'slugify';

export function createPath(str?: string) {
  if (str && !str.startsWith('/')) {
    return '/' + str;
  }
  return str;
}

export function emptyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}


export async function insertAdmin() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD || 'Telewellness01*'
  const firstName = process.env.ADMIN_NAME
  const lastName = process.env.ADMIN_LASTNAME

  if (!email || !password || !firstName || !lastName) {
    console.error('Missing admin environment variables.')
    return
  }

  const existing = await Admin.findOne({ where: { email } })
  if (existing) {
    console.log('Admin already exists.')
    return
  }

  const baseSlug = slugify(`${firstName} ${lastName}`, {
    lower: true,
    strict: true,
    trim: true,
  });

  let profileSlug = baseSlug;
  let isUnique = false;
  let counter = 1;

  while (!isUnique) {
    const existingSlug = await Admin.findOne({
      where: { profileSlug },
    });
    if (!existingSlug) {
      isUnique = true;
    } else {
      profileSlug = `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${counter}`;
      counter++;
    }
  }

  const hashedPassword = await hashPassword(password)

  await Admin.create({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    profileSlug
  })
}

async function hashPassword(password: string): Promise<string> {
  const salt = Number(process.env.ADMIN_SALT) || 10;
  return await bcrypt.hash(password, salt)
}