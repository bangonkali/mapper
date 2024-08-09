export type GalleryWorkspaceView = 'masonry' | 'editor';

export type GalleryComputedLayout = {
  header: {
    width: number;
    height: number;
    visible: boolean;
  };
  footer: {
    width: number;
    height: number;
    visible: boolean;
  };
  docks: {
    left: {
      minWidth: number;
      width: number;
      height: number;
      visible: boolean;
      splitterEnabled: boolean;
      splitterVisible: boolean;
    };
    right: {
      minWidth: number;
      width: number;
      height: number;
      visible: boolean;
      splitterEnabled: boolean;
      splitterVisible: boolean;
    };
    bottom: {
      height: number;
      visible: boolean;
      splitterEnabled: boolean;
      splitterVisible: boolean;
      minHeight: number;
    };
    workspace: {
      width: number;
      height: number;
      resizing: boolean;
      minWidth: number;
      minHeight: number;
    };
  };
};
