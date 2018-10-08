module uitool.config {
    import HashList = sear.struct.HashList;
    import Image = sear.ui.Image;
    import ImageLabel = sear.ui.ImageLabel;
    import Label = sear.ui.Label;
    import HtmlLabel = sear.ui.HtmlLabel;
    import InputLabel = sear.ui.InputLabel;
    import Button = sear.ui.Button;
    import StateButton = sear.ui.StateButton;
    import ScrollPanel = sear.ui.ScrollPanel;
    import ProgressBar = sear.ui.ProgressBar;
    import ComboBox = sear.ui.ComboBox;

    export function getList(): ComData[] {
        return getConfigs().values;
    }
    export function getComConfig(comUI: any): ComData {
        return getConfigs().get(sear.getClassName(comUI));
    }
    let configs: HashList<ComData>;
    function getConfigs(): HashList<ComData> {
        if (!configs) {
            configs = new HashList<ComData>();
            let comfig: ComData;

            // image
            comfig = new ComData(Image);
            configs.add(comfig.name, comfig);

            // label
            comfig = new ComData(Label);
            configs.add(comfig.name, comfig);
            comfig.addKey("text", ComKey.string, "文本");

            // button
            comfig = new ComData(Button);
            configs.add(comfig.name, comfig);
            comfig.addKey("label", ComKey.string, "文本");

            // HtmlLabel
            comfig = new ComData(HtmlLabel);
            configs.add(comfig.name, comfig);

            // InputLabel
            comfig = new ComData(InputLabel);
            configs.add(comfig.name, comfig);

            // ImageLabel
            comfig = new ComData(ImageLabel);
            configs.add(comfig.name, comfig);

            // StateButton
            comfig = new ComData(StateButton);
            configs.add(comfig.name, comfig);

            // ScrollPanel
            comfig = new ComData(ScrollPanel);
            configs.add(comfig.name, comfig);

            // ProgressBar
            comfig = new ComData(ProgressBar);
            configs.add(comfig.name, comfig);

            // comboBox
            comfig = new ComData(ComboBox);
            configs.add(comfig.name, comfig);
        }
        return configs;
    }
}