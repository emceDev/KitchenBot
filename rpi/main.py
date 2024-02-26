import board
import busio
import time

# Create a UART object using busio
uart_busio = busio.UART(board.GP0, board.GP1, baudrate=9600)


try:
    while True:
        uart_busio.write("ping\n".encode('utf-8'))  # Send "ping" to Arduino
        time.sleep(1)  # Delay for 1 second
        data = uart_busio.read(32)
        if data is not None:
            data = data.decode('utf-8').strip()
            if data == "pong":
                print("Received: pongong")  # Respond to "ping" with "pong"
            else:
                print('data',data)
        else:
            print("No data received")
except UnicodeError as e:
    print(f"UnicodeError: {e}")
except KeyboardInterrupt:
    uart_busio.deinit()
