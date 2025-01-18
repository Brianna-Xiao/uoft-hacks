from flask import Flask, jsonify
from threading import Thread, Event
import time

app = Flask(__name__)
PORT = 8000

# Timer state stored in memory for now
timer_state = {
    "time_left": 60,  # Initial time in seconds
    "is_running": False
}

# Event to stop the background thread
stop_event = Event()

def background_timer():
    """Background thread to decrement the timer."""
    while not stop_event.is_set():
        if timer_state["is_running"] and timer_state["time_left"] > 0:
            time.sleep(1)  # Wait 1 second
            timer_state["time_left"] -= 1
        elif timer_state["time_left"] <= 0:
            timer_state["is_running"] = False

@app.route('/start', methods=['POST'])
def start_timer():
    """Start or resume the timer."""
    timer_state["is_running"] = True
    return jsonify({"message": "Timer started", "time_left": timer_state["time_left"]})

@app.route('/pause', methods=['POST'])
def pause_timer():
    """Pause the timer."""
    timer_state["is_running"] = False
    return jsonify({"message": "Timer paused", "time_left": timer_state["time_left"]})

@app.route('/status', methods=['GET'])
def get_status():
    """Get the current timer status."""
    return jsonify(timer_state)

@app.route('/reset', methods=['POST'])
def reset_timer():
    """Reset the timer."""
    timer_state["time_left"] = 60
    timer_state["is_running"] = False
    return jsonify({"message": "Timer reset", "time_left": timer_state["time_left"]})

if __name__ == '__main__':
    # Start the background thread
    timer_thread = Thread(target=background_timer, daemon=True)
    timer_thread.start()
    try:
        app.run(debug=True, host='0.0.0.0', port=PORT)
    except KeyboardInterrupt:
        stop_event.set()
        timer_thread.join()
