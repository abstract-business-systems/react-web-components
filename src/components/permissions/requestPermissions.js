const getMediaDevices = (data) => navigator.mediaDevices.getUserMedia(data);
const requestDevice = (data) => navigator[data].requestDevice({ filters: [] });

const requestPermissions = {
	notifications: () => Notification.requestPermission(),
	geolocation: () => navigator.geolocation.getCurrentPosition(() => {}),
	camera: () => getMediaDevices({ video: true }),
	microphone: () => getMediaDevices({ audio: true }),
	midi: () => navigator.requestMIDIAccess(),
	localFonts: () => window.queryLocalFonts(),
	hid: () => requestDevice('hid'),
	usb: () => requestDevice('usb'),
	clipboard: () => navigator.clipboard.read(),
};

export default requestPermissions;
