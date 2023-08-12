import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  email: string;
}

const ResetPasswordEmail = ({ email }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Jobly reset your password</Preview>
      <Tailwind>
        <Body className='mx-auto my-auto bg-white font-sans'>
          <Container>
            <Section>
              <Text>Hi {email},</Text>
              <Text>
                Someone recently requested a password change for your Jobly
                account. If this was you, you can set a new password here:
              </Text>
              <Button href='/'>Reset password</Button>
              <Text>
                If you don&apos;t want to change your password or didn&apos;t
                request this, just ignore and delete this message.
              </Text>
              <Text>
                To keep your account secure, please don&apos;t forward this
                email to anyone.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
