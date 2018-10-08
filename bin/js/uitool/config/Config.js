var uitool;
(function (uitool) {
    var config;
    (function (config) {
        var HashList = sear.struct.HashList;
        var Image = sear.ui.Image;
        var ImageLabel = sear.ui.ImageLabel;
        var Label = sear.ui.Label;
        var HtmlLabel = sear.ui.HtmlLabel;
        var InputLabel = sear.ui.InputLabel;
        var Button = sear.ui.Button;
        var StateButton = sear.ui.StateButton;
        var ScrollPanel = sear.ui.ScrollPanel;
        var ProgressBar = sear.ui.ProgressBar;
        var ComboBox = sear.ui.ComboBox;
        function getList() {
            return getConfigs().values;
        }
        config.getList = getList;
        function getComConfig(comUI) {
            return getConfigs().get(sear.getClassName(comUI));
        }
        config.getComConfig = getComConfig;
        var configs;
        function getConfigs() {
            if (!configs) {
                configs = new HashList();
                var comfig = void 0;
                // image
                comfig = new config.ComData(Image);
                configs.add(comfig.name, comfig);
                // label
                comfig = new config.ComData(Label);
                configs.add(comfig.name, comfig);
                comfig.addKey("text", config.ComKey.string, "文本");
                // button
                comfig = new config.ComData(Button);
                configs.add(comfig.name, comfig);
                comfig.addKey("label", config.ComKey.string, "文本");
                // HtmlLabel
                comfig = new config.ComData(HtmlLabel);
                configs.add(comfig.name, comfig);
                // InputLabel
                comfig = new config.ComData(InputLabel);
                configs.add(comfig.name, comfig);
                // ImageLabel
                comfig = new config.ComData(ImageLabel);
                configs.add(comfig.name, comfig);
                // StateButton
                comfig = new config.ComData(StateButton);
                configs.add(comfig.name, comfig);
                // ScrollPanel
                comfig = new config.ComData(ScrollPanel);
                configs.add(comfig.name, comfig);
                // ProgressBar
                comfig = new config.ComData(ProgressBar);
                configs.add(comfig.name, comfig);
                // comboBox
                comfig = new config.ComData(ComboBox);
                configs.add(comfig.name, comfig);
            }
            return configs;
        }
    })(config = uitool.config || (uitool.config = {}));
})(uitool || (uitool = {}));
//# sourceMappingURL=Config.js.map