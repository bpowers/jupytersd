import { renderSvgToString } from '@system-dynamics/diagram';
import { datamodel } from '@system-dynamics/core';

import { IDisposable } from '@lumino/disposable';

import { Panel } from '@lumino/widgets';

import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

export class WidgetRenderer extends Panel
  implements IRenderMime.IRenderer, IDisposable {
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this.mimeType = options.mimeType;
  }

  async renderModel(mimeModel: IRenderMime.IMimeModel): Promise<void> {
    const source: any = mimeModel.data[this.mimeType];

    const contents = source['project_source'];
    const project = datamodel.Project.deserializeBase64(contents);

    const [svg] = await renderSvgToString(project, 'main');

    // Let's be optimistic, and hope the widget state will come later.
    ((this.node as unknown) as any).textContent = svg;

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
