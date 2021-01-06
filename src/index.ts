import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the jupytersd extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupytersd:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension jupytersd is activated!');
  }
};

export default extension;
