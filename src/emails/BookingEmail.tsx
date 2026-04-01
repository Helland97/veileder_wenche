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

interface BookingEmailProps {
  service: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function BookingEmail({
  service,
  date,
  time,
  name,
  email,
  phone,
  message,
}: BookingEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "system-ui, sans-serif", background: "#faf8f5" }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "40px 20px" }}>
          <Heading style={{ color: "#343d2d", fontSize: 24 }}>
            Ny timebestilling
          </Heading>
          <Section style={{ background: "#fff", padding: 24, borderRadius: 8 }}>
            <Text><strong>Tjeneste:</strong> {service}</Text>
            <Text><strong>Dato:</strong> {date}</Text>
            <Text><strong>Tid:</strong> {time}</Text>
            <Hr />
            <Text><strong>Navn:</strong> {name}</Text>
            <Text><strong>E-post:</strong> {email}</Text>
            <Text><strong>Telefon:</strong> {phone}</Text>
            {message && (
              <>
                <Hr />
                <Text><strong>Kommentar:</strong></Text>
                <Text>{message}</Text>
              </>
            )}
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
