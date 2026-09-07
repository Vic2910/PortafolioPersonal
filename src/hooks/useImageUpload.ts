import { useState } from 'react'
import { supabase } from '../config/supabase'

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error'
  url: string | null
  error: string | null
}

export function useImageUpload() {
  const [uploadState, setUploadState] = useState<UploadState>({
    status: 'idle',
    url: null,
    error: null,
  })

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) {
      setUploadState({
        status: 'error',
        url: null,
        error: 'El archivo debe ser una imagen',
      })
      return null
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadState({
        status: 'error',
        url: null,
        error: 'La imagen no debe superar 5MB',
      })
      return null
    }

    setUploadState({ status: 'uploading', url: null, error: null })

    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
      const filePath = `projects/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('projects')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath)

      setUploadState({
        status: 'success',
        url: data.publicUrl,
        error: null,
      })

      return data.publicUrl
    } catch (err) {
      setUploadState({
        status: 'error',
        url: null,
        error: err instanceof Error ? err.message : 'Error al subir la imagen',
      })
      return null
    }
  }

  const reset = () => {
    setUploadState({ status: 'idle', url: null, error: null })
  }

  return {
    uploadState,
    uploadImage,
    reset,
  }
}
