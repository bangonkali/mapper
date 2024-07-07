export interface GalleryItemLayoutBox {
  /**
   * Aspect ratio of the box.
   */
  aspectRatio: number;
  /**
   * Distance between the top side of the box and the top boundary of the justified layout.
   */
  top: number;
  /**
   * Width of the box in a justified layout.
   */
  width: number;
  /**
   * Height of the box in a justified layout.
   */
  height: number;
  /**
   * Distance between the left side of the box and the left boundary of the justified layout.
   */
  left: number;
  /**
   * Whether or not the aspect ratio was forced.
   */
  forcedAspectRatio?: boolean;
}