export function downloadBlob(dataFile: any, contentType?: string, fileName?: string) {
    if (dataFile && contentType && fileName) {
        const blob = base64ToBlob(dataFile, contentType);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();

        window.URL.revokeObjectURL(url);
    } else {
        console.info('No file available to download.');
    }
}

export function downloadBlobFile(dataFile: any, fileName: string) {
   const link = document.createElement('a');
      link.href = URL.createObjectURL(dataFile);
      link.download = fileName;;
      link.click();
      URL.revokeObjectURL(link.href);
}

export function base64ToBlob(base64: any, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
}
