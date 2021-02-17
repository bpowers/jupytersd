import { IRenderMime } from '@jupyterlab/rendermime-interfaces';

import { WidgetRenderer } from './WidgetRenderer';

/**
 * The mime type for a widget view.
 */
export const MIME_TYPE = 'application/vnd.simlin.widget-view+json';

export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new WidgetRenderer(options)
};

/**
 * Initialization data for the jupyter-simlin extension.
 */
const extension: IRenderMime.IExtension = {
  id: 'jupyter-simlin:plugin',
  rendererFactory,
  rank: 0,
  dataType: 'json',
  fileTypes: [
    {
      name: 'simlin_jupyter_widget',
      mimeTypes: [MIME_TYPE],
      extensions: ['.simlin'],
    },
  ],
  documentWidgetFactoryOptions: {
    name: 'Jupyter Simlin Viewer',
    primaryFileType: 'simlin_jupyter_widget',
    fileTypes: ['simlin_jupyter_widget'],
    defaultFor: ['simlin_jupyter_widget'],
  },
};

export default extension;
