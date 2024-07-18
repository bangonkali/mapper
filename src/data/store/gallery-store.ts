import { Store } from "@tanstack/react-store";

export type GalleryStoreLayout = {
  gallery: {
    layout: {
      constraint: {
        header: {
          desiredHeight: number;
          visible: boolean;
        };
        footer: {
          desiredHeight: number;
          visible: boolean;
        };
        docks: {
          left: {
            minWidth: number;
            desiredWidth: number;
            visible: boolean;
            splitterEnabled: boolean;
            splitterVisible: boolean;
          };
          right: {
            minWidth: number;
            desiredWidth: number;
            visible: boolean;
            splitterEnabled: boolean;
            splitterVisible: boolean;
          };
          bottom: {
            desiredHeight: number;
            visible: boolean;
            splitterEnabled: boolean;
            splitterVisible: boolean;
            minHeight: number;
          };
          workspace: {
            minWidth: number;
            minHeight: number;
          };
        };
      };
    };
  };
};

export const galleryStoreLayout = new Store<GalleryStoreLayout>({
  gallery: {
    layout: {
      constraint: {
        header: {
          desiredHeight: 50,
          visible: true,
        },
        footer: {
          desiredHeight: 24,
          visible: true,
        },
        docks: {
          left: {
            desiredWidth: 200,
            minWidth: 150,
            visible: true,
            splitterEnabled: false,
            splitterVisible: false,
          },
          right: {
            desiredWidth: 200,
            minWidth: 150,
            visible: true,
            splitterEnabled: false,
            splitterVisible: false,
          },
          bottom: {
            desiredHeight: 150,
            visible: true,
            splitterEnabled: false,
            splitterVisible: false,
            minHeight: 60,
          },
          workspace: {
            minWidth: 500,
            minHeight: 300,
          },
        },
      },
    },
  },
});
