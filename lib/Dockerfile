FROM quay.io/afx-abu/abu-multi-latest
RUN git clone https://github.com/Afx-Abu/Asena-MD /Jsl/Abu/
WORKDIR /Jsl/Abu/
ENV TZ=Asia/Kolkata
RUN npm install supervisor -g
RUN yarn install --ignore-engines
CMD ["node", "bot.js"]
