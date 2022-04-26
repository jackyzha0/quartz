package testutil

import "testing"

// This will fail to compile if the TestingT interface is changed in a way
// that doesn't conform to testing.T.
var _ TestingT = (*testing.T)(nil)
