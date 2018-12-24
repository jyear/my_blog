function vilidLength({ maxLength, minLength }, data) {
    if (maxLength && minLength) {
        return (
            data.trim().length >= minLength && data.trim().length <= maxLength
        );
    }
    if (maxLength) {
        return data.trim().length <= maxLength;
    }
    if (minLength) {
        return data.trim().length >= minLength;
    }
}
function vilidEmpty(data) {
    return data.trim().length > 0;
}

function vilidDataFun(vilitor, data) {
    let vilitorKeys = Object.keys(vilitor);
    let dataKeys = Object.keys(data);
    if (vilitorKeys && vilitorKeys.length > 0) {
        vilitorKeys.map(item => {
            if (dataKeys.indexOf(item) == -1) {
                throw new Error(`${item}字段不存在`);
            }
            let itemKeys = Object.keys(vilitor[item]);
            if (itemKeys && itemKeys.length > 0) {
                itemKeys.map(v => {
                    switch (v) {
                        case "empty":
                            if (vilitor[item][v]) {
                                let em = vilidEmpty(data[item]);

                                if (!em) {
                                    throw new Error(`${item}不能为空`);
                                }
                            }
                            break;
                        case "length":
                            let len = vilidLength(vilitor[item][v], data[item]);
                            if (!len) {
                                throw new Error(
                                    `${item}长度不合法${
                                        vilitor[item][v].maxLength
                                            ? ",长度不得大于" +
                                              vilitor[item][v].maxLength
                                            : ""
                                    }${
                                        vilitor[item][v].minLength
                                            ? ",长度不得小于" +
                                              vilitor[item][v].minLength
                                            : ""
                                    }`
                                );
                            }
                            break;
                        case "vilitorList":
                            if (
                                vilitor[item][v] &&
                                vilitor[item][v] instanceof Array &&
                                vilitor[item][v].length > 0
                            ) {
                                vilitor[item][v].map(vilidItem => {
                                    let res = vilidItem.vilitor(data[item]);
                                    if (!res) {
                                        throw new Error(vilidItem.message);
                                    }
                                });
                            }

                            break;
                    }
                });
            }
        });
    }
}
function vilidData(vilitor, data) {
    try {
        vilidDataFun(vilitor, data);
        return {
            state: "success",
            message: "验证成功"
        };
    } catch (e) {
        if (e) {
            return {
                state: "error",
                message: e
                    .toString()
                    .trim()
                    .replace("Error:", "")
            };
        }
    }
}
module.exports = vilidData;
