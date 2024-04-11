from google.cloud import storage
import os
import mimetypes


def run():

    bucket_name = os.getenv('INPUT_BUCKET')
    source_folder = os.getenv('INPUT_DIST-FOLDER')

    # Create a client
    client = storage.Client.from_service_account_json(os.getenv('INPUT_GCP-KEY'))

    # Get the bucket
    bucket = client.get_bucket(bucket_name)

    # Walk the source folder and upload all files
    for root, subdirs, files in os.walk(source_folder):
        for file in files:
            file_path = os.path.join(root, file)
            blob = bucket.blob(file_path.replace(source_folder + '/', ''))
            blob.upload_from_filename(file_path)
            blob.content_type = mimetypes.guess_type(file)[0]
            blob.patch()

if __name__ == '__main__':
    run()
