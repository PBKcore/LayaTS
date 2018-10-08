var sysui;
(function (sysui) {
    // 系统默认UI，便于写工具。主要自动设定皮肤等通用属性
    var Layout = sear.ui.Layout;
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
    sysui.font = "Arial";
    sysui.size = 12;
    function getImage(width, height) {
        var image = new Image();
        image.width = width;
        image.height = height;
        // image.skin = "";
        // image.sizeGrid = "";
        return image;
    }
    sysui.getImage = getImage;
    function getImageLabel(width, height) {
        var imageLabel = new ImageLabel();
        imageLabel.width = width;
        imageLabel.height = height;
        imageLabel.skin = "res/default/ui/imglab/jingyan/0.png";
        imageLabel.align = Layout.ALIGN_LEFT;
        imageLabel.valign = Layout.VALIGN_TOP;
        // imageLabel.text = "";
        return imageLabel;
    }
    sysui.getImageLabel = getImageLabel;
    function getLabel(width, height) {
        var label = new Label();
        label.width = width;
        label.height = height;
        label.font = sysui.font;
        label.fontSize = sysui.size;
        label.color = "#000000";
        // label.bold = false;
        // label.italic = false;
        // label.underline = false;
        // label.underlineColor = "";
        // label.align = "";
        // label.valign = "";
        // label.padding = "";
        // label.wordWrap = false;
        // label.leading = 0;
        // label.stroke = 1;
        // label.strokeColor = "";
        // label.bgColor = "";
        // label.borderColor = "";
        // label.overflow = "";
        // label.text = "";
        return label;
    }
    sysui.getLabel = getLabel;
    function getHtmlLabel(width, height) {
        var htmlLabel = new HtmlLabel();
        htmlLabel.width = width;
        htmlLabel.height = height;
        // htmlLabel.align = "";
        // htmlLabel.valign = "";
        // htmlLabel.padding = [];
        // htmlLabel.leading = 0;
        // htmlLabel.stroke = 1;
        // htmlLabel.strokeColor = "";
        // htmlLabel.bgColor = "";
        // htmlLabel.borderColor = "";
        // htmlLabel.password = false;
        // htmlLabel.text = "";
        return htmlLabel;
    }
    sysui.getHtmlLabel = getHtmlLabel;
    function getInputLabel(width, height) {
        var inputLabel = new InputLabel();
        inputLabel.width = width;
        inputLabel.height = height;
        inputLabel.font = sysui.font;
        inputLabel.fontSize = sysui.size;
        inputLabel.color = "#000000";
        inputLabel.borderColor = "#000000";
        // inputLabel.bgx = -6;
        // inputLabel.skin = "res/default/ui/label/input/13,13,13,13.png";
        // inputLabel.sizeGrid = "13,13,13,13";
        inputLabel.promptColor = "#949494";
        // inputLabel.prompt = "";
        // inputLabel.multiline = false;
        // inputLabel.editable = true;
        // inputLabel.restrict = "";
        // inputLabel.maxChars = 10;
        // inputLabel.asPassword = false;
        // label
        return inputLabel;
    }
    sysui.getInputLabel = getInputLabel;
    function getButton(width, height) {
        var button = new Button();
        button.width = Math.max(82, width);
        button.height = height;
        button.skin = "res/default/ui/btn/btn_k-1/1_0,36,0,36.png";
        button.stateNum = 1;
        button.sizeGrid = "0,36,0,36";
        button.clickFeedback = 1;
        button.labelFont = sysui.font;
        button.labelSize = sysui.size;
        button.labelColors = "#ffffff,#ffffff,#ffffff,#ffffff";
        // button.label = "";
        // button.labelBold = false;
        // button.labelPadding = "";
        // button.labelAlign = Layout.ALIGN_CENTER;
        // button.labelStroke = 1;
        // button.labelStrokeColor = "";
        // button.strokeColors = "";
        // button.toolTip = "";
        return button;
    }
    sysui.getButton = getButton;
    function getStateButton(width, height) {
        var button = new StateButton();
        button.width = width;
        button.height = height;
        button.group = 1;
        button.toggle = false;
        return button;
    }
    sysui.getStateButton = getStateButton;
    function getVScrollPanel(width, height) {
        var bar = new ScrollPanel();
        bar.width = width;
        bar.height = height;
        bar.vScrollBarSkin = "res/default/ui/touming.png";
        bar.vScrollBar.showButtons = false;
        bar.vScrollBar.sizeGrid = "0,0,0,0";
        return bar;
    }
    sysui.getVScrollPanel = getVScrollPanel;
    function getProgressBar(width, height) {
        var bar = new ProgressBar();
        bar.skin = "";
        bar.sizeGrid = "";
        return bar;
    }
    sysui.getProgressBar = getProgressBar;
    function getComboBox(width, height) {
        var comboBox = new ComboBox();
        comboBox.width = width;
        comboBox.height = height;
        return comboBox;
    }
    sysui.getComboBox = getComboBox;
})(sysui || (sysui = {}));
//# sourceMappingURL=SysUI.js.map