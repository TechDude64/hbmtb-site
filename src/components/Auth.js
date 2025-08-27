import React from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

const Auth = () => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#1E88E5', // hb-blue
                  brandAccent: '#1565C0', // hb-blue-dark
                  defaultButtonBackground: '#1A1A1A', // hb-gray
                  defaultButtonBackgroundHover: '#2A2A2A', // hb-gray-light
                  inputBackground: '#0D0D0D', // hb-dark
                  inputBorder: '#2A2A2A', // hb-gray-light
                  inputBorderHover: '#1E88E5', // hb-blue
                  inputText: '#F0F0F0', // hb-light
                  text: '#F0F0F0', // hb-light
                  textInverse: '#0D0D0D', // hb-dark
                  anchorTextColor: '#42A5F5', // hb-blue-light
                  anchorTextColorHover: '#1E88E5', // hb-blue
                },
                space: {
                  buttonPadding: '12px 24px',
                  inputPadding: '12px 16px',
                },
                radii: {
                  borderRadiusButton: '0.5rem',
                  buttonBorderRadius: '0.5rem',
                  inputBorderRadius: '0.5rem',
                },
              },
            },
          }}
          providers={['google', 'github']}
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Auth;
