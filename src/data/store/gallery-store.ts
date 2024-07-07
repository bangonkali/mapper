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
          };
          right: {
            minWidth: number;
            desiredWidth: number;
            visible: boolean;
            splitterEnabled: boolean;
          };
          bottom: {
            desiredHeight: number;
            visible: boolean;
          };
          workspace: {
            minWidth: number;
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
          },
          right: {
            desiredWidth: 200,
            minWidth: 150,
            visible: true,
            splitterEnabled: false,
          },
          bottom: {
            desiredHeight: 0,
            visible: false,
          },
          workspace: {
            minWidth: 500,
          },
        },
      },
    },
  },
});
