package utils

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"time"

	"github.com/vicanso/go-axios"
)

func HttpRequest(url string) *axios.Instance {
	instance := axios.NewInstance(&axios.InstanceConfig{
		BaseURL:     url,
		EnableTrace: true,
		Client: &http.Client{
			Transport: &http.Transport{
				Proxy: http.ProxyFromEnvironment,
			},
		},
		Timeout: 10 * time.Second,
		OnDone: func(config *axios.Config, resp *axios.Response, err error) {
			fmt.Println(config)
			fmt.Println(resp)
			fmt.Println(err)
		},
	})

	return instance
}

func Get(base string, path string, query ...url.Values) []byte {
	response, err := HttpRequest(base).Get(path, query...)
	if err != nil {
		log.Fatal("Failed to GET")
	}

	return response.Data
}

func Post(base string, path string, data interface{}, query ...url.Values) []byte {
	response, err := HttpRequest(base).Post(path, data, query...)
	if err != nil {
		log.Fatal("Failed to POST")
	}

	return response.Data
}

func Patch(base string, path string, data interface{}, query ...url.Values) []byte {
	response, err := HttpRequest(base).Patch(path, data, query...)
	if err != nil {
		log.Fatal("Failed to PATCH")
	}

	return response.Data
}

func Delete(base string, path string, query ...url.Values) []byte {
	response, err := HttpRequest(base).Delete(path, query...)
	if err != nil {
		log.Fatal("Failed to DELETE")
	}

	return response.Data
}
