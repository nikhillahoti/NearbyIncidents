from gcm import GCM
gcm = GCM("SERVER-API-KEY", debug=True)
token = "DEVICE-TOKEN"
data = {"name": "Incident took place on Lenzen Avenue"} # The text to send
response = gcm.plaintext_request(registration_id=token, data=data)
