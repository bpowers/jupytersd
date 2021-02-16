import { IDisposable } from '@lumino/disposable';

import { Panel } from '@lumino/widgets';

import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

export class WidgetRenderer extends Panel
  implements IRenderMime.IRenderer, IDisposable {
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this.mimeType = options.mimeType;
  }

  async renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    const source: any = model.data[this.mimeType];

    // Let's be optimistic, and hope the widget state will come later.
    this.node.textContent = 'Loading widget...';

    // If there is no model id, the view was removed, so hide the node.
    if (source.model_id === '') {
      this.hide();
      return;
    }
  }

  dispose(): void {
    super.dispose();
    // TODO: finalize react-y stuff?
  }

  /**
   * The mimetype being rendered.
   */
  readonly mimeType: string;
}
