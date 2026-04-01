import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Hr,
} from "@react-email/components";

interface ContactEmailProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  phone,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#faf8f5" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
          <Heading style={{ color: "#343d2d", fontSize: 24 }}>
            Ny melding fra kontaktskjema
          </Heading>
          <Section style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
            <Text><strong>Navn:</strong> {name}</Text>
            <Text><strong>E-post:</strong> {email}</Text>
            {phone && <Text><strong>Telefon:</strong> {phone}</Text>}
            <Hr />
            <Text><strong>Melding:</strong></Text>
            <Text>{message}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
