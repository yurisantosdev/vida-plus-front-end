export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result)
      } else {
        reject(new Error('Falha ao converter arquivo para base64'))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

export const fileToBase64Sync = (file: File): string => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  return reader.result as string
} 