void setup()
{
  Serial.begin(9600); // Initialize serial communication
}

void loop()
{
  if (Serial.available() > 0)
  {
    String input = Serial.readStringUntil('\n');
    if (input == "ping")
    {
      Serial.println("pong"); // Respond to "ping" with "arduino greets"
    }
    else
    {
      Serial.println("received data but not ping");
    }
  }
}