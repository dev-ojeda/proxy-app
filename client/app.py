import tkinter as tk
import socketio

# Configurar Socket.IO
sio = socketio.Client()


def connect():
    try:
        sio.connect("http://localhost:8000")  # Conectar al servidor
        status_label.config(text="Conectado al servidor", fg="green")
    except Exception as e:
        status_label.config(text=f"Error: {e}", fg="red")


def send_message():
    msg = entry.get()
    if msg:
        sio.emit("message", msg)
        chat_text.insert(tk.END, f"Tú: {msg}\n")
        entry.delete(0, tk.END)


@sio.on("message")
def receive_message(data):
    chat_text.insert(tk.END, f"Servidor: {data}\n")


# Crear GUI con Tkinter
root = tk.Tk()
root.title("Chat con Socket.IO")

frame = tk.Frame(root)
frame.pack(padx=10, pady=10)

status_label = tk.Label(frame, text="Desconectado", fg="red")
status_label.pack()

chat_text = tk.Text(frame, height=10, width=50)
chat_text.pack()

entry = tk.Entry(frame, width=40)
entry.pack(side=tk.LEFT, padx=5)

send_button = tk.Button(frame, text="Enviar", command=send_message)
send_button.pack(side=tk.RIGHT)

connect_button = tk.Button(frame, text="Conectar", command=connect)
connect_button.pack(pady=5)

root.mainloop()
