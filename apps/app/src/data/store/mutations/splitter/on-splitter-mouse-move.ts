import { Store } from '@tanstack/react-store';
import { GalleryStoreLayout } from '../../gallery-store';
import { produce } from 'immer';
import { GalleryComputedLayout } from '../../../../models/app/app-layout';
import { Size } from '../../../../models/Size';

export const onSplitterMouseMove = (
  side: 'left' | 'right' | 'bottom',
  parent: Size,
  computed: GalleryComputedLayout,
  galleryStoreLayout: Store<GalleryStoreLayout>,
  e: React.MouseEvent<HTMLDivElement, MouseEvent>
) => {
  if (computed.docks[side].splitterEnabled) {
    galleryStoreLayout.setState((state) => {
      return produce(state, (draft) => {
        if (side === 'left' || side === 'right') {
          const preferredWidth =
            side === 'right' ? parent.width - e.clientX : e.clientX;
          if (
            preferredWidth <
            draft.gallery.layout.constraint.docks[side].minWidth
          ) {
            draft.gallery.layout.constraint.docks[side].visible = true;
            draft.gallery.layout.constraint.docks[side].desiredWidth =
              draft.gallery.layout.constraint.docks[side].minWidth;
          } else {
            draft.gallery.layout.constraint.docks[side].visible = true;
            draft.gallery.layout.constraint.docks[side].desiredWidth =
              preferredWidth;
          }

          const otherSide = side === 'left' ? 'right' : 'left';
          const workspaceWidth =
            parent.width - preferredWidth - computed.docks[otherSide].width;
          if (workspaceWidth < computed.docks.workspace.minWidth) {
            const maxWidth =
              parent.width -
              computed.docks.workspace.minWidth -
              computed.docks[otherSide].width;
            draft.gallery.layout.constraint.docks[side].desiredWidth = maxWidth;
          }
        } else if (side === 'bottom') {
          let preferredHeight =
            parent.height - e.clientY - computed.footer.height;

          const parentHalfHeight = Math.round(parent.height / 2);
          if (preferredHeight > parentHalfHeight) {
            preferredHeight = parentHalfHeight;
          }

          draft.gallery.layout.constraint.docks[side].desiredHeight =
            preferredHeight;

          // TODO: implement clipping mechanism such that bottom dock does not exceed the height of the parent

          // if (
          //   preferredHeight <
          //   draft.gallery.layout.constraint.docks[side].minHeight
          // ) {
          //   draft.gallery.layout.constraint.docks[side].visible = true;
          //   draft.gallery.layout.constraint.docks[side].desiredHeight =
          //     draft.gallery.layout.constraint.docks[side].minHeight;
          // } else {
          //   draft.gallery.layout.constraint.docks[side].visible = true;
          //   draft.gallery.layout.constraint.docks[side].desiredHeight =
          //     preferredHeight;
          // }

          // const workspaceHeight =
          //   parent.height - preferredHeight - computed.docks.workspace.height;
          // if (workspaceHeight < computed.docks.workspace.minHeight) {
          //   const maxHeight =
          //     parent.height -
          //     computed.docks.workspace.minHeight -
          //     computed.header.height;
          //   draft.gallery.layout.constraint.docks[side].desiredHeight =
          //     maxHeight;
          // }
        }
      });
    });
  }
};
