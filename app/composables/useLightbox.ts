export interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

const state = reactive({
  open: false,
  images: [] as LightboxImage[],
  index: 0,
});

export function useLightbox() {
  function openLightbox(images: LightboxImage[], index = 0) {
    state.images = images;
    state.index = Math.max(0, Math.min(index, images.length - 1));
    state.open = true;
  }

  function closeLightbox() {
    state.open = false;
  }

  function prev() {
    if (state.images.length > 0) {
      state.index = (state.index - 1 + state.images.length) % state.images.length;
    }
  }

  function next() {
    if (state.images.length > 0) {
      state.index = (state.index + 1) % state.images.length;
    }
  }

  return { state, openLightbox, closeLightbox, prev, next };
}
