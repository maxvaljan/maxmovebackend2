import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xyzcompany.supabase.co';
const supabaseKey = 'public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable()
export class AuthService {
  async register(body: any) {
    const { email, password } = body;
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'User registered successfully', user };
  }

  async login(body: any) {
    const { email, password } = body;
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Login successful', user };
  }
}