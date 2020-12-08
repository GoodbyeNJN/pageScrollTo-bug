import React, { Component } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import "./index.scss";

export default class Index extends Component {
  handleClick = (index: number) => {
    // 获取当前的位置信息
    Taro.createSelectorQuery()
      .selectViewport()
      .scrollOffset()
      .select(`#anchor-titles`)
      .boundingClientRect()
      .select(`#anchor-item-${index}`)
      .boundingClientRect()
      .exec(([viewPort, titles, item]) => {
        // 计算页面滚动的目标垂直位置
        const y = viewPort.scrollTop + item.top - titles.height;
        console.log("==================================");
        console.log("目标垂直位置:", y);
        console.log("----------------------------------");
        console.log("滚动前的垂直位置:", viewPort.scrollTop);
        console.log("期望的垂直滚动距离:", y - viewPort.scrollTop);
        console.log("----------------------------------");

        // 开始滚动
        Taro.pageScrollTo({
          scrollTop: y,
          complete() {
            // 滚动结束后再次获取位置信息
            Taro.createSelectorQuery()
              .selectViewport()
              .scrollOffset()
              .exec(([view]) => {
                console.log("滚动后的垂直位置:", view.scrollTop);
                console.log(
                  "实际的垂直滚动距离:",
                  view.scrollTop - viewPort.scrollTop
                );
                console.log("==================================");
              });
          },
        });
      });
  };

  render() {
    return (
      <View className="main">
        <View className="margin"></View>

        {/* 吸顶标题 */}
        <View className="sticky-top-container">
          <View className="titles" id="anchor-titles">
            {[1, 2, 3].map((value, index) => (
              <View
                key={value}
                className="title"
                onClick={() => this.handleClick(index)}
              >
                {`title-${value}`}
              </View>
            ))}
          </View>
        </View>

        {/* 色块 */}
        <View className="items-container">
          {[1, 2, 3, 4].map((value, index) => (
            <View
              key={value}
              className="item"
              id={`anchor-item-${index}`}
            ></View>
          ))}
        </View>
      </View>
    );
  }
}
